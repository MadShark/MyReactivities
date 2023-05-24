import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer (function ActivityForm() {
    
    const {activityStore} = useStore();
    const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore;
    
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
        currentActivity?.id ? updateActivity(currentActivity) : createActivity(currentActivity);
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
                <Form.Input type="date" placeholder='Date' name='date' value={currentActivity.date} onChange={HandleInputChange} />
                <Form.Input placeholder='City' name='city' value={currentActivity.city} onChange={HandleInputChange} />
                <Form.Input placeholder='Venue' name='venue' value={currentActivity.venue} onChange={HandleInputChange} />
                
                <Button loading={loading} floated="right" positive type="submit" content='Submit' />
                <Button onClick={closeForm} floated="right" type="button" content='Cancel' />
            </Form>
        </Segment>
    )
})
