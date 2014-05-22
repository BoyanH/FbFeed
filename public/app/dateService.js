app.factory("DateService", function ($location, $q) {


    return {

        normalizeDate: function (date) {

            var year = date.substring(0, 4),
                month = date.substring(5, 7),
                day = date.substring(8, 10) + '.',
                time = date.substring(11, 19),
                newDate;

            switch(month) {

                case '01': 
                    month = 'January';
                    break;
                
                case '02':
                    month = 'February';
                    break;

                case '03':
                    month = 'March';
                    break;

                case '04':
                    month = 'April';
                    break;

                case '05':
                    month = 'May';
                    break;

                case '06':
                    month = 'June';
                    break;

                case '07':
                    month = 'July';
                    break;

                case '08':
                    month = 'August';
                    break;

                case '09':
                    month = 'September';
                    break;

                case '10':
                    month = 'October';
                    break;

                case '11':
                    month = 'November';
                    break;

                case '12':
                    month = 'December';
                    break;
            }

            newDate = day + ' of ' + month + ', ' + year + '  at ' + time;

            console.log(newDate);
            return newDate
        }
    }
});