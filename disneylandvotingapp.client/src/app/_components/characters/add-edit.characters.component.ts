import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CharacterService } from '../../_services/character.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'add-edit.characters.component.html',
  styleUrls: ['add-edit.characters.component.css']
})
export class AddEditCharactersComponent implements OnInit {

  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      pictureUrl: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.characterService.getById(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }
  }


  public get f() { return this.form; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.isAddMode) {
      this.AddCharacter();
    } else {
      this.updateCharacter();
    }
  }

  private AddCharacter() {
    this.characterService.create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastrService.success('Character added');
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
           this.toastrService.error(error.message);
          this.loading = false;
        }
      });
  }

  private updateCharacter() {
    this.characterService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastrService.success('Character updated');
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.toastrService.error(error.message);
          this.loading = false;
        }
      });
  }
}


