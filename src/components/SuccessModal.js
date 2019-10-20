import {Modal} from 'antd';



// const SuccessModal = () => {
//   return (
//     <Modal.success
//       title ="Success message"
//       content = "User detail successfully saved to database"
//     />
//   )
// }

const successModal = () => {
  Modal.success({
    title: 'Success message',
    content: 'User detail successfully saved to database',
  });
}

export default successModal;