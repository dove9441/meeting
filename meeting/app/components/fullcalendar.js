'use client' // 안 쓰면 당연히 오류남 ㅋㅋ

import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useState, useEffect } from 'react'
import Modal from '@components/modal'


export default function CalenderPage(props){
		let [showModal, setShowModal] = useState(false)
		let [ events, changeEvnt ] = useState([])
		let [targetEvent, setTargetEvent] = useState({})
		
	
		// DB에서 불러온 데이터 전처리
		
		useEffect(()=>{
		let dbEvents = props.data.map((e)=>{
					e.id = e._id
					delete e._id
					delete e.room
					return e
				})
				console.log(dbEvents)
				console.log(events)
				changeEvnt(dbEvents)
		},[])
		
	
	
		// 모달 창 관련 스크립트
		
		const clickModal = function(){
			setShowModal(!showModal)
		}
	
	
	  let handleDateClick = function(info) {
			alert('Clicked on: ' + info.dateStr);
			//alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
			//alert('Current view: ' + info.view.type);
		
		  clickModal()
		  let eventarr = [...events]
		  let eventcount = eventarr.length
		  let newtitle = prompt('일정 이름을 설정해 주세요!')
		  // eventarr.push({ id : 'event'+ eventcount , title : newtitle, start : info.dateStr})
		  // //console.log(eventarr)
		  // changeEvnt(eventarr)
		  }
	  
	
	  let handleEventClick = function(info) {
			//alert('Event: ' + info.event.title);
			//alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
			//alert('View: ' + info.view.type);
		  
		  // 시간 변경 함수 ( ->'2023-07-15')
		let dateFormat = function(today){
			  return today.getFullYear() +'-' + ( (today.getMonth()+1) < 9 ? "0" + (today.getMonth()+1) : (today.getMonth()+1) )+'-' + ( (today.getDate()) < 9 ? "0" + (today.getDate()) : (today.getDate()) )
		  }
		  
		  
		  
		  // Modal창의 입력 칸에 자동으로 입력되도록 하기
			let oldtitle = info.event.title
		
			let user_input_start_date = dateFormat(info.event.start)
			let user_input_end_date = ''
			
			// 데이터 넘기기
			if(info.event.end){
				user_input_end_date = dateFormat(info.event.end)
				setTargetEvent({title : oldtitle, start : user_input_start_date, end : user_input_end_date})
			}else{
				setTargetEvent({title : oldtitle, start : user_input_start_date, end : user_input_start_date})
			}
		  // Modal 창 띄우기	  	
		  	clickModal()
		  	
		
		  // Modal에서 변경된 데이터를 적용하기
		  	let newtitle = targetEvent.title
			let newstart = targetEvent.start
			let newend = targetEvent.end
			
			if(newtitle==null){
				info.event.setProp('title', oldtitle )
			}else{
				info.event.setProp('title', newtitle)
			}
			
		  	info.event.setDates(newstart, newend)
		  // Modal 창 닫기는 modal.js에서 진행, targetEvent 초기화
		  	//setTargetEvent({})
		  
			// change the border color just for fun
			//info.el.style.borderColor = 'red';
		  }
	  
	  
	  let handleEventHover = function(info){
		  //alert('hover!')	  
	  }
	  
		
	  
    return (
	<>
	<button onClick={clickModal}>모달</button>
	{showModal && <Modal clickModal={clickModal} setTargetEvent={setTargetEvent} data={targetEvent}/>}
	<div id='calendar'>
	<FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
        initialView="dayGridMonth"
		height={'700px'}
		headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
		nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
		locale={'ko'}
		dateClick = {handleDateClick}
		events = {events}
		eventClick = {handleEventClick}
		eventMouseEnter= {handleEventHover}
      />
	</div>
	</>
      
    )
  
}