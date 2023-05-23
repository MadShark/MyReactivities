import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
	activities: IActivity[];
	selectedActivity: IActivity | undefined;
	handleSelectedActivity: (id: string) => void;
	cancelSelectedActivity: () => void;
    editMode: boolean;
    handleFormOpen: (id: string) => void;
    handleFormClose: () => void;
    handleCreateEdit: (activity: IActivity) => void;
    handleDeleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityDashboard({ activities,
                                            selectedActivity,
                                            handleSelectedActivity,
                                            cancelSelectedActivity,
                                            editMode,
                                            handleFormOpen,
                                            handleFormClose,
                                            handleCreateEdit,
                                            handleDeleteActivity,
                                            submitting
                                        }: Props) {
	return (
		<Grid>
			<Grid.Column width='10'>
				<ActivityList 
                    activities={activities}
                    handleSelectedActivity={handleSelectedActivity}
                    handleDeleteActivity={handleDeleteActivity} 
                    submitting={submitting}
                />
			</Grid.Column>
			<Grid.Column width='6'>
				{selectedActivity && !editMode &&
                <ActivityDetails 
                    activity={selectedActivity} 
                    cancelSelectedActivity={cancelSelectedActivity}
                    handleFormOpen={handleFormOpen}
                />}
                
				{editMode && 
                <ActivityForm 
                    handleFormClose={handleFormClose}
                    selectedActivity={selectedActivity} 
                    handleCreateEdit={handleCreateEdit}
                    submitting={submitting}
                />}
			</Grid.Column>
		</Grid>
	);
}
