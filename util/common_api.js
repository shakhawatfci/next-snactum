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


export function getUnreadNotificationCount()
{

    return axios.get(`/unread-notification-count`);

}
