/**
 * CICHA Created: 15/12/2014
 */
(function () {
    var app = angular.module('app');
    app.controller('MailCont', ["$scope", "$rootScope", 'MailServ', function ($scope, $rootScope, MailServ) {

            $scope.mail = {
                emailAddresses: [],
                subject: "",
                content: "",
                attachment: []
            };

            $scope.enviado = false;

            $scope.emailAddressesAvailables = [];

            $scope.create = function () {

                if ($scope.mail.emailAddresses.length == 0) {
                    new PNotify({styling: 'fontawesome',
                        title: 'Atención',
                        text: "Debe ingresar al menos un destinatario.",
                        type: 'warning',
                        delay: 5000,
                    });

                    return;
                }

                var invalidAddresses = [];

                for (let email of $scope.mail.emailAddresses) {

                    if (!$.validateEmail(email)) {

                        invalidAddresses.push(email);
                    }
                }


                if (invalidAddresses.length == 1) {

                    var strIA = invalidAddresses.join(", ");

                    new PNotify({styling: 'fontawesome',
                        title: 'Atención',
                        text: "El destinatario <b>" + strIA + "</b> no posee un e-mail válido.",
                        type: 'warning',
                        delay: 5000
                    });

                    return;
                }

                if (invalidAddresses.length > 1) {

                    var strIA = invalidAddresses.join(", ");

                    new PNotify({styling: 'fontawesome',
                        title: 'Atención',
                        text: "Los destinatarios <b>" + strIA + "</b> no posee un e-mail válido.",
                        type: 'warning',
                        delay: 5000
                    });

                    return;
                }

                $scope.enviado = true;


                MailServ.create($scope.mail).success(function (data) {
                    $scope.enviado = false;
                    $scope.mail.subject = "";
                    $scope.mail.content = "";
                     
                }).error(function () {
                    $scope.enviado = false;
                });
            };


        }]);
}());