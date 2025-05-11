import { useParams } from "react-router-dom";

interface IScreeningForm {

    isCreate: boolean;
}

const ScreeningForm = ({isCreate}: IScreeningForm) => {
    const {id} = useParams();
    
    return <div>Hello screenings
        <p>{id}</p>
        <p>{JSON.stringify(isCreate)}</p>
        </ div>
}

export default ScreeningForm;