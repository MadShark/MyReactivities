import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

export default observer (function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    
    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity])
    
    if (!activity) return <LoadingComponent />;
    
	return (
		<Grid>
            <Grid.Column width={10}>
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat />
                <ActivityDetailedHeader activity={activity} />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar />
            </Grid.Column>
        </Grid>
	);
})
