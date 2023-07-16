import Calender from '@components/fullcalendar'
import { connectDB } from '/util/database'
import Head from "next/head"
import { ObjectId } from 'mongodb'



// DB 비밀번호 : 9NrwKlK6F0OFPROK ID : admin
// 임시 roomid : 64ac07b691df8f88bf231ebe


export default async function Room(props){
	const db = (await connectDB).db('meeting')
	let room = await db.collection('room').findOne({_id : new ObjectId(props.params.roomid) })
	let eventDB = await db.collection('events')
	let events = await eventDB.find({ "room" : props.params.roomid}).toArray()
	
	// 아래 3줄 써줘야 이상한 경고 안 뜨더
	/*Warning: Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.
{_id: {}, title: ..., content: ...} */
	events = events.map((a)=>{
    a._id = a._id.toString()
    return a
  })
	
	return(
		<main id='main'>
		<Calender data={events}/>
		</main>
	)


}