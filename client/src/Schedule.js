import { useEffect } from 'react';

const Schedule = ({ showSchedule, data }) => {

    useEffect(() => {
        console.log(showSchedule);
    }, [showSchedule])

    return(
        <div>
            {showSchedule ? 
            <div>
                Hej
            </div>
            : ''}
        </div>
    )
}

export default Schedule;