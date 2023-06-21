function  timeFunc (someDate: string): string {
    const dateConv = new Date(someDate)
    const hours = dateConv.getHours()
    const minutes = dateConv.getMinutes()

    let convertMin = minutes.toString();
    if (minutes < 10) {
        convertMin = `0${minutes}`;
    }
    return `${hours}:${convertMin}`;
}
export default timeFunc;
