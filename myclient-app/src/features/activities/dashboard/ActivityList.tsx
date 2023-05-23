import { Button, Item, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { SyntheticEvent, useState } from "react";

interface Props {
    activities: IActivity[];
    handleSelectedActivity: (id: string) => void;
    handleDeleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityList({activities, handleSelectedActivity, handleDeleteActivity, submitting}: Props) {
    
    const [target, setTarget] = useState('');
    
    function HandleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        handleDeleteActivity(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
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
                                    onClick={() => handleSelectedActivity(activity.id)} floated="right"
                                    content='View'
                                    color="blue"
                                 />
                                <Button 
                                    onClick={(e) => HandleDeleteActivity(e, activity.id)} 
                                    floated="right"
                                    content='Delete' 
                                    color="red"
                                    loading={submitting && target === activity.id}
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
}
