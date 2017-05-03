interface routes {
    ConferenceInfoUrl: string,
    ExhibitorsInfoUrl: string,
    NewsInfoUrl: string,
    ScheduleInfoUrl: string
}

// export const ROUTES: routes = {
//     ConferenceInfoUrl: 'http://cltglobal.ddns.net:8080/info/1',
//     ExhibitorsInfoUrl: 'http://cltglobal.ddns.net:8080/user/exhibitors/1',
//     NewsInfoUrl: 'http://cltglobal.ddns.net:8080/news/1',
//     ScheduleInfoUrl: 'http://cltglobal.ddns.net:8080/schedule/1'
// };

export const ROUTES: routes = {
    ConferenceInfoUrl: 'http://localhost:5000/info/1',
    ExhibitorsInfoUrl: 'http://localhost:5000/user/exhibitors/1',
    NewsInfoUrl: 'http://localhost:5000/news/1',
    ScheduleInfoUrl: 'http://localhost:5000/schedule/1'
};