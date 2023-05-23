import { Button, Card, Image } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface Props {
    activity: IActivity;
    cancelSelectedActivity: () => void;
    handleFormOpen: (id: string) => void;
}

export default function ActivityDetails({activity, cancelSelectedActivity, handleFormOpen}: Props) {
	return (
		<Card fluid>
			<Image src={`/assets/categoryImages/${activity.category}.jpg`} />
			<Card.Content>
				<Card.Header>{activity.title}</Card.Header>
				<Card.Meta>
					<span className='date'>{activity.date}</span>
				</Card.Meta>
				<Card.Description>
					{activity.description}
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group widths='2'>
                    <Button onClick={() => handleFormOpen(activity.id)} basic color="blue" content='Edit' />
                    <Button onClick={cancelSelectedActivity} basic color="grey" content='Cancel' />
                </Button.Group>
			</Card.Content>
		</Card>
	);
}
