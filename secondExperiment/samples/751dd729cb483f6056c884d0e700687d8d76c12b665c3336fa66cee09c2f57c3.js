$(function () {
    $("#AskForQuoteForm").validate(
        {
            rules:
            {
                Name: { required: true },
                CompanyName: { required: true },
                EMail: { required: true },
                PhoneNumber: { required: true },
                Message: { required: true }
            },
            submitHandler: function (form) {
                $(".dvLoading").show();
                form.submit();
            },
            messages: {
                Name: "This field is required",
                CompanyName: "This field is required",
                EMail: "This field is required",
                PhoneNumber: "This field is required",
                Message: "This field is required"
            }
        });
});
