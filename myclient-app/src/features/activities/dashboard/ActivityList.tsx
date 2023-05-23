import { Button, Item, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface Props {
    activities: IActivity[];
    handleSelectedActivity: (id: string) => void;
    handleDeleteActivity: (id: string) => void;
}

export default function ActivityList({activities, handleSelectedActivity, handleDeleteActivity}: Props) {
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
                                <Button onClick={() => handleSelectedActivity(activity.id)} floated="right" content='View' color="blue" />
                                <Button onClick={() => handleDeleteActivity(activity.id)} floated="right" content='Delete' color="red" />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}
