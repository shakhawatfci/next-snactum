    import axios  from "./server";

    export function getAllStudent()
    {
        return axios.get(`/student-list?no_pagination=yes`);
    }

    export function getAllTeacher()
    {
        return axios.get(`/teacher-list?no_pagination=yes`);
    }

    export function getAllParent()
    {

        return axios.get(`/parent-list?no_pagination=yes`);

    }
    export function getAllInstitute()
    {

        return axios.get(`/institute-list?no_pagination=yes`);

    }
    export function getAllCountryList()
    {

        return axios.get(`/country-list?no_pagination=yes`);

    }
    export function getAllRegionList(country_id = '')
    {

        return axios.get(`/region-list?country_id=${country_id}`);

    }


    export function getUnreadNotificationCount()
    {

        return axios.get(`/unread-notification-count`);

    }
