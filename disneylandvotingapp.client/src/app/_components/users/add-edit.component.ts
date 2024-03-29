﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../_services';
import { MustMatch } from '../../_helpers';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: 'add-edit.component.html',
    styleUrls: ['add-edit.component.css']
  })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private toastrService: ToastrService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            role: ['', Validators.required],
            password: ['', Validators.compose([Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator])],
            confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
        }, { validator: MustMatch});

        if (!this.isAddMode) {
            this.userService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    public get f() { return this.form; }

    onSubmit() {
        this.submitted = true;
        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        this.userService.create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.toastrService.success('User added');
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.toastrService.error(error.message);
                    this.loading = false;
                }
            });
    }

    private updateUser() {
        this.userService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.toastrService.success('User updated');
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.toastrService.error(error.message);
                    this.loading = false;
                }
            });
    }
}
