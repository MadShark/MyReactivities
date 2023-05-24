import { Button, Item, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer (function ActivityList() {
    const {activityStore} = useStore();
    const {deleteActivity, activitiesByDate, loading} = activityStore;
    
    const [target, setTarget] = useState('');
    
    function HandleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'> {activity.title} </Item.Header>
                            <Item.Meta> {activity.date} </Item.Meta>
                            <Item.Description> 
                                <div>{activity.description}</div>
                                <div>{activity.city}</div>
                                <div>{activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button 
                                    onClick={() => activityStore.selectCurrentActivity(activity.id)} floated="right"
                                    content='View'
                                    color="blue"
                                 />
                                <Button 
                                    onClick={(e) => HandleDeleteActivity(e, activity.id)} 
                                    floated="right"
                                    content='Delete' 
                                    color="red"
                                    loading={loading && target === activity.id}
                                    name={activity.id}
                                 />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
