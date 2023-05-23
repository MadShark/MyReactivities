import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'

function App() {
	const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>();
    const [editMode, setEditMode] = useState(false);
    
	useEffect(() => {
		axios.get('http://localhost:5000/api/activities')
            .then((response) => {
			    setActivities(response.data);
		});
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
        activity.id
            ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
            : setActivities([...activities, {...activity, id: uuid()}]);
        setEditMode(false);
        setSelectedActivity(activity);
    }
    
    function HandleDeleteActivity(id: string) {
        setActivities([...activities.filter(x => x.id !== id)]);
    }
    
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
                />
			</Container>
		</>
	);
}

export default App;
