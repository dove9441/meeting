import { MongoClient } from 'mongodb'
const url = 'mongodb+srv://admin:9NrwKlK6F0OFPROK@meeting.krunjyh.mongodb.net/?retryWrites=true&w=majority'
const options = { useNewUrlParser: true }
let connectDB

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}
export { connectDB }

/*
 

- import 어쩌구를 해야 설치한 라이브러리 사용이 가능합니다. 

 

- connectDB 변수를 하나 만들어서 MongoClient.connect 결과를 저장해두고 export 해서 필요할 때마다 사용하면 됩니다.

 

- 근데 Nextjs의 경우 개발할 땐 파일저장할 때 마다 자바스크립트 파일들이 재실행되기 때문에

MongoClient.connect가 동시에 여러개 실행될 수 있습니다. 그럼 DB입출력이 매우 느려짐 

그걸 방지하고 싶으면 if문으로 "개발중 상태면 global이라는 전역변수 저장소에 보관해주세요" 라고 써놓으면 됩니다.

 

- 개발말고 실제 프로덕션 상태일 땐 global을 사용안하는게 좋아서 else문도 추가했습니다.

프로덕션 상태일 땐 중복실행될 일이 별로 없어서 대충 저렇게 해도 잘 돌아갑니다.

 

이제 await connectDB 사용할 때 마다 그 자리에 MongoClient(url, options).connect()가 남으니까 맘대로 사용하면 됩니다.

 */