import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";

interface Props {
    selectedActivity: IActivity | undefined;
    handleFormClose: () => void;
    handleCreateEdit: (activity: IActivity) => void;
}

export default function ActivityForm({selectedActivity, handleFormClose, handleCreateEdit}: Props) {
    
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    };
    
    const[currentActivity, setCurrentActivity] = useState(initialState);
    
    function HandleSubmit() {
        handleCreateEdit(currentActivity);
    };
    
    function HandleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setCurrentActivity({...currentActivity, [name]: value});
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={HandleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' name='title' value={currentActivity.title} onChange={HandleInputChange} />
                <Form.TextArea placeholder='Description' name='description' value={currentActivity.description} onChange={HandleInputChange} />
                <Form.Input placeholder='Category' name='category' value={currentActivity.category} onChange={HandleInputChange} />
                <Form.Input placeholder='Date' name='date' value={currentActivity.date} onChange={HandleInputChange} />
                <Form.Input placeholder='City' name='city' value={currentActivity.city} onChange={HandleInputChange} />
                <Form.Input placeholder='Venue' name='venue' value={currentActivity.venue} onChange={HandleInputChange} />
                
                <Button floated="right" positive type="submit" content='Submit' />
                <Button onClick={handleFormClose} floated="right" type="button" content='Cancel' />
            </Form>
        </Segment>
    )
}
