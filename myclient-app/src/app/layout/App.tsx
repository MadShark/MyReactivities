import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
	const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>();
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    
	useEffect(() => {
		agent.Activities.list().then(response => {
            let activities: IActivity[] = [];
            response.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                activities.push(activity);
            });
            setActivities(activities);
            setLoading(false);
        })
	}, []);
    
    function HandleSelectedActivity(id: string) {
        setSelectedActivity(activities.find(x => x.id === id));
    }
    
    function CancelSelectedActivity() {
        setSelectedActivity(undefined);
    }
    
    function HandleFormOpen(id?: string) {
        id ? HandleSelectedActivity(id) : CancelSelectedActivity();
        setEditMode(true);
    }
    
    function HandleFormClose() {
        setEditMode(false);
    }
    
    function HandleCreateEditActivity(activity: IActivity) {
        
        setSubmitting(true);
        if (activity.id) {
            agent.Activities.update(activity).then(() => {
                setActivities([...activities.filter(x => x.id !== activity.id), activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            });
        } else {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            });
        }
    }
    
    function HandleDeleteActivity(id: string) {
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)]);
            setSubmitting(false);
        });
        
    }
    
    if (loading) return <LoadingComponent content='Loading App' />
    
	return (
		<>
			<NavBar handleFormOpen={HandleFormOpen} />
			<Container style={{marginTop: '7em'}}>
                <ActivityDashboard 
                    activities={activities}
                    selectedActivity={selectedActivity}
                    handleSelectedActivity={HandleSelectedActivity}
                    cancelSelectedActivity={CancelSelectedActivity}
                    editMode={editMode}
                    handleFormOpen={HandleFormOpen}
                    handleFormClose={HandleFormClose}
                    handleCreateEdit={HandleCreateEditActivity}
                    handleDeleteActivity={HandleDeleteActivity}
                    submitting={submitting}
                />
			</Container>
		</>
	);
}

export default App;
