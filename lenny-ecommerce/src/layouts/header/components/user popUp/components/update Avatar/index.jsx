import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { instance } from '../../../../../../api';
import style from './style.modul.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label,Input } from 'reactstrap';

const UpdateAvatar = ({token, userId,userName, avatarURL,isUserDataUpdate, setIsUserDataUpdate}) => {
  const [modal, setModal] = React.useState(false)
  const [file, setFile] = React.useState(null)


  const toggle = () => {
    if(window.innerWidth < 1400) {
      toast.warn("You are not allowed to change while using mobile and Ipad version, please use a computer*", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }) 
    } else {
      setModal(!modal)
    }
  }

  //! File Change
  const handleFileChange = ({target: {files}}) => {
    if(files?.length) {
      const {type} = files[0]
      if(type ===  "image/png" || type === "image/jpeg") {
        setFile(files[0])
      } else {
        toast.error("Accept only PNG and JPEG images types*", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      }
    }
  }

  //! Update user avatar Id
  const updateUserAvatarId = async (avatarID, avatarURL) => {
    try {
      await instance.put(`/users/${userId}`, 
      {avatarID, avatarURL},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`
        }
      })

      setIsUserDataUpdate(true)
      if(isUserDataUpdate){
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  }

  //! File Submit
  const handleSubmit = async () => {
    if(!file) {
      toast.error("File is required*", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      })
      return
    }

    try {
      const files = new FormData()
      files.append("files", file)
      files.append("name", `${userName} avatar`)

      const {
        data: [{id, url}]
      } = await instance.post("/upload", files, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`
        }
      })
      updateUserAvatarId(id, url)
      setFile(null)
      setModal(false)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className={style.update_user_avatar}>
    <Button color="primary" onClick={toggle} style={{width: "150px"}} className={style.change_picture}>
      {`${avatarURL ? "Change" : "Upload"} picture`}
    </Button>
    <Modal isOpen={modal} toggle={toggle} style={{marginTop: "75px", left: "-60px"}}>
      <ModalHeader toggle={toggle}>Upload You Avatar</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='exampleFile'>File</Label>
            <Input 
            type="file"
            name='file'
            id='examplefile'
            onChange={handleFileChange}/>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit} style={{width: "90px"}}>
          Upload
        </Button>{' '}
        <Button color="secondary" onClick={toggle} style={{width: "90px"}}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  </div>
  )
}

export default UpdateAvatar