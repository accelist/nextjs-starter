export interface ProblemDetails {
    type: string;
    title: string;
    status: number;
    traceId: string;
    errors: Record<string, string[]> | undefined;
}

/*
// https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.problemdetails?view=aspnetcore-6.0
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.6.1",
  "title": "An error occurred while processing your request.",
  "status": 500,
  "traceId": "00-330d73096d49e6a561d1422e355e9720-95889ed30f285704-00"
}

// https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.validationproblemdetails?view=aspnetcore-6.0
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "traceId": "00-7ce36b7e0f395a48fb132b194ead79eb-b1b296f394a57968-00",
  "errors": {
    "Email": [
      "'Email' must not be empty.",
      "'Email' is not a valid email address."
    ],
    "Password": [
      "'Password' must not be empty.",
      "Password is not strong enough"
    ],
    "GivenName": [
      "'Given Name' must not be empty."
    ],
    "FamilyName": [
      "'Family Name' must not be empty."
    ]
  }
}
*/
