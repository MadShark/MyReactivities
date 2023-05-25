import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { IActivity } from "../../../app/models/activity";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid'

export default observer (function ActivityForm() {
    
    const {activityStore} = useStore();
    const {selectedActivity, loading, 
            updateActivity, createActivity,
            loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();
    
    const[currentActivity, setCurrentActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });
    
    useEffect(() => {
        if (id) loadActivity(id).then(activity => setCurrentActivity(activity!));
    }, [id, loadActivity]);
    
    function HandleSubmit() {
        // ===[ CREATE ]===
        if (!currentActivity.id) {
            currentActivity.id = uuid();
            createActivity(currentActivity).then(() => navigate(`/activities/${currentActivity.id}`));
        } 
        // ===[ EDIT ]===
        else {
            updateActivity(currentActivity).then(() => navigate(`/activities/${currentActivity.id}`));
        }
    };
    
    function HandleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setCurrentActivity({...currentActivity, [name]: value});
    }
    
    if (loadingInitial) return <LoadingComponent content="Loading Activity..." />
    
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
                <Button as={Link} to='/activities' floated="right" type="button" content='Cancel' />
            </Form>
        </Segment>
    )
})
