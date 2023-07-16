'use client'

export default function Modal(props){
	//console.log(props)
	
	let setEvent = function(){
		let newtitle = document.getElementById('title').value
		let input_start = document.getElementById('start-date').value
		let input_end = document.getElementById('end-date').value
		props.setTargetEvent({title : newtitle, start : input_start, end : input_end})
		console.log('수정된 이벤트 : ',props.data)
		props.clickModal()
	}
	
	return(
		<div id='modal'>
			<div className='modal-content'>
					<div>
				<label htmlFor="title" className="form-label">
				  일정 이름
				</label>
				<input type="text" className="form-control form-title" id="title" placeholder='이름' defaultValue={props.data.title} />
				<label htmlFor="start-date" className="form-label">
				  시작/종료
				</label>
				<input type="date" className="form-control" id="start-date" defaultValue={props.data.start}/>to
				  <input type="date" className="form-control" id="end-date" defaultValue={props.data.end}/>
					<button id='saveBtn' className="btn btn-primary" onClick={setEvent}>저장</button>
					<button id='cancelBtn' className="btn btn-primary" onClick={props.clickModal}>취소</button>
			
    	</div>
			</div>
		
		</div>	
	
	)
	
	
}