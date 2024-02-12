using disneylandvotingapp.Api.Enums;

namespace disneylandvotingapp.Api.Helper
{
    public static class StringExtension
    {
        public static Title ToTitle(this string str)
        {
            switch (str)
            {
                case " Mr":
                    return Title.Mr;
                case "Mrs":
                    return Title.Mrs;
                case "Miss":
                    return Title.Miss;
                case "Ms":
                    return Title.Ms;
            }
            return Title.Mr;
        }

        public static Roles ToRole(this string str)
        {
            switch (str)
            {
                case "Admin":
                    return Roles.Admin;
                case "User":
                    return Roles.Basic;
            }
            return Roles.Basic;
        }

    }
}
