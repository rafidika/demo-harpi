import React, { Fragment, useState } from 'react'
import Alert from './Alert'
import '../styles/idcardnew.css'
import '../styles/admin.css'
import { saveAs } from 'file-saver'
import domtoimage from 'dom-to-image';
import Axios from 'axios';

function IdCardModal (data) {
    const [NamaLengkap, setNama] = useState(data.data.nama);
    const [Email, setEmail] = useState(data.data.email);
    const [NoHp, setNoHp] = useState(data.data.hp);
    const [TanggalLahir, setTanggal] = useState(data.data.tanggal.split("T")[0]);
    const [Domisili, setDomisili] = useState(data.data.domisili);
    const [Verified, setVerified] = useState(data.data.verified);
    const [alert, setAlert] = useState({show: false, msg: "", type: ""})
    
    const generateIdCard = () => {
        var node = document.getElementById(`id-card-${data.data.id}`);
        domtoimage.toPng(node)
        .then(function (dataUrl) {
            saveIdToServer(dataUrl);
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    }

    const saveIdToServer = async (imgSrc) => {
        const editData = new FormData();
        editData.append('Id', data.data.id);
        editData.append('IdCard', imgSrc);
        editData.append('Verified', Verified);
        editData.append('Domisili', Domisili);
        editData.append('TanggalLahir', TanggalLahir);
        editData.append('NoHp', NoHp);
        editData.append('Email', Email);
        editData.append('NamaLengkap', NamaLengkap);
        
        try {
            await Axios.put(`http://localhost:8080/admin/add-id-card/${data.data.id}`, editData, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            .then(verifMember(data.data))
        } catch (err) {
            console.error(err.message);
        }
    }

    const verifMember = async (verifyMember) => {
        verifyMember.verified = true;
        try {
            await Axios.put(`http://localhost:8080/admin/verify/${verifyMember.id}`, verifyMember, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            // .then(window.location.href = "/admin");
        } catch (err) {
            console.log(err.message);
        }
    }

    const showAlertSend = (show = false, msg = "", type = "") => {
        setAlert({show, msg, type})
    }


    return (
        <Fragment>
           <button type="button" className="bukti" data-toggle="modal" data-target={`#id-card-modal-${data.data.id}`}>
            Kartu Anggota
            </button>
            <div className="modal" id={`id-card-modal-${data.data.id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Kartu Anggota</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div style={{'left' : '25px'}} className="modal-body">
                            {alert.show && <Alert msg={alert.msg} type={alert.type} removeAlert={showAlertSend}/>}
                            <div id={`id-card-${data.data.id}`} className="container-id-card">
                                <div className="header-id-card">
                                    <img src="/assets/logo-white.png" alt="logo" className="logo-white-id" />
                                    <h4 className="title-id-card">Kartu Tanda Anggota HARPI Melati</h4>
                                </div>
                                <h4 className="number-id-card">ID               : {data.data.id}</h4>
                                <h4 className="nama-id-card">Nama        : {data.data.nama}</h4>
                                <h4 className="nohp-id-card">No. HP      : {data.data.hp}</h4>
                                <div className="rectangle-id-card">
                                </div>
                                <h4 className="date-id-card">Bergabung pada 28 Desember 2020</h4>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="kirim" onClick={generateIdCard}>Kirim</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default IdCardModal;
