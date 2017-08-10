var m = require("mithril")

module.exports = {
    view: function(vnode) {
    	return [
        m(".row", [
            m(".header", [
                m("img[src='food 2.png']")
            ]),
            m(".whiteBox",
                m(".row",
                    m(".col-md-6", [
                        m("h1.u-marginTop-62.u-colorHeader.u-fontStyle",
                            "Today's Options"
                        ),
                        m("p.u-color.u-marginBottom-24",
                            "Select location by clicking the radio button next to location. To change vote click on the vote you choose."
                        ),
                        m(".row", [
                            m(".col-md-6", [
                                m(".u-fontsize-24", [
                                    m("input[type='radio']", { style: { "margin-right": "12px" } }),
                                    "Kroger"
                                ]),
                                m("p.u-color",
                                    "Gus, Dustin, Arrow, Micheal, Lafe, Lamar Jermey, Koby, Chris, Terry, Dee"
                                )
                            ]),
                            m(".col-md-6", [
                                m("strong.u-fontsize-24", [
                                    m("input[type='radio']", { style: { "margin-right": "12px" } }),
                                    "Kroger"
                                ]),
                                m("p.u-color",
                                    "Gus, Dustin, Arrow, Micheal, Lafe, Lamar Jermey, Koby, Chris, Terry, Dee"
                                )
                            ]),
                            m(".col-md-6", [
                                m("strong.u-fontsize-24", [
                                    m("input[type='radio']", { style: { "margin-right": "12px" } }),
                                    "Kroger"
                                ]),
                                m("p.u-color",
                                    "Gus, Dustin, Arrow, Micheal, Lafe, Lamar Jermey, Koby, Chris, Terry, Dee"
                                )
                            ]),
                            m(".col-md-6", [
                                m("strong.u-fontsize-24", [
                                    m("input[type='radio']", { style: { "margin-right": "12px" } }),
                                    "Kroger"
                                ]),
                                m("p.u-color",
                                    "Gus, Dustin, Arrow, Micheal, Lafe, Lamar Jermey, Koby, Chris, Terry, Dee"
                                )
                            ])
                        ]),
                        m("span.u-color",
                            " Add a new location to vote. ( 2 more the max )"
                        ),
                        m(".input-group.u-heightsize-41.u-marginBottom-24",
                            m("input.form-control[aria-describedby='basic-addon1'][placeholder='Type Location...'][type='text']")
                        ),
                        m(".row",
                            m(".col-md-12", [
                                m("span.u-fontSize-18",
                                    "Currently 0/3rds"
                                ),
                                m("p.u-color",
                                    "will only rest the agreement of 2/3rds of the group"
                                )
                            ])
                        ),
                        m("button.btn.btn-secondary[type='button']",
                            "Change Vote"
                        )
                    ])
                )
            )
        ]),
        m("script[src='https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js']"),
        m("script[crossorigin='anonymous'][integrity='sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa'][src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js']"),
        m("script[type='text/javascript']", )
        ]
    }
}



// <head>
//    <meta charset="utf-8">
//    <meta http-equiv="X-UA-Compatible" content="IE=edge">
//    <meta name="viewport" content="width=device-width, initial-scale=1">
//    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
//    <title></title>
//    <!-- Latest compiled and minified CSS -->
//    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
//    <!-- Optional theme -->
//    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
//    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,900" rel="stylesheet">
//    <link href="http://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" type="text/css">
//    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
//    <link rel="stylesheet" type="text/css" href="../../style/css/animation.css">
//    <link rel="stylesheet" type="text/css" href="../../dist/css/hijro.css">
//    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
//    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
//    <!--[if lt IE 9]>
//      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
//      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
//    <![endif]-->
// </head>

// <!DOCTYPE html>
// <html>

// <head>
//    <meta charset="utf-8">
//    <meta http-equiv="X-UA-Compatible" content="IE=edge">
//    <meta name="viewport" content="width=device-width, initial-scale=1">
//    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
//    <title></title>
//    <!-- Latest compiled and minified CSS -->
//    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
//    <!-- Optional theme -->
//    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
//    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,900" rel="stylesheet">
//    <link href="http://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" type="text/css">
//    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
//    <link rel="stylesheet" type="text/css" href="../../style/css/animation.css">
//    <link rel="stylesheet" type="text/css" href="../../dist/css/hijro.css">
//    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
//    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
//    <!--[if lt IE 9]>
//      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
//      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
//    <![endif]-->
// </head>
// <style type="text/css">