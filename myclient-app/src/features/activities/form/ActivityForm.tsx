import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { IActivity } from "../../../app/models/activity";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import {v4 as uuid} from 'uuid';

export default observer (function ActivityForm() {
    
    const {activityStore} = useStore();
    const { updateActivity, createActivity, loadActivity, loadingInitial } = activityStore;
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
    
    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required()
    })
    
    useEffect(() => {
        if (id) loadActivity(id).then(activity => setCurrentActivity(activity!));
    }, [id, loadActivity]);
    
    function HandleFormSubmit(currentActivity: IActivity) {
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
    
    if (loadingInitial) return <LoadingComponent content="Loading Activity..." />
    
    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={currentActivity} 
                onSubmit={values => HandleFormSubmit(values)}
            >
            {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder='Title' name='title' />
                    <MyTextArea rows={3} placeholder='Description' name='description' />
                    <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                    <MyTextInput type="date" placeholder='Date' name='date' />
                    {/* <MyDateInput  placeholderText='Date' name='date' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' /> */}
                    
                    <Header content='Location Details' sub color='teal' />
                    <MyTextInput placeholder='City' name='city' />
                    <MyTextInput placeholder='Venue' name='venue' />
                    
                    <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} floated='right' 
                            positive type='submit' content='Submit' />
                    <Button as={Link} to='/activities' floated="right" type="button" content='Cancel' />
                </Form>
                )}
            </Formik>
        </Segment>
    )
})
