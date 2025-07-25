import moment from "moment";

export const formatDate = (timestamp) => {
    return new Date(timestamp);
}

export const ConvertDateTimeToString = (date) => {
    return moment(date).format('L');
}

export const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const timeString = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
    return timeString;
}

export const getDateRange = (startDate, endDate) => {

    const start = moment(new Date(startDate));
    const end = moment(new Date(endDate));
    const dateRange = [];
    let currentDate = start.clone();

    while (currentDate.isSameOrBefore(end)) {
        dateRange.push(currentDate.format('L'));
        currentDate.add(1, 'days');
    }

    return dateRange;
}