import React, { Fragment, useState } from 'react'
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
    const [IdCard, setIdCard] = useState();
    
    const generateIdCard = () => {
        var node = document.getElementById(`id-card-${data.data.id}`);
        domtoimage.toPng(node)
        .then(function (dataUrl) {
            setIdCard(dataUrl)
        })
        .then(saveIdToServer())
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    }

    const saveIdToServer = async () => {
        const editData = new FormData();
        editData.append('Id', data.data.id);
        editData.append('IdCard', IdCard);
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
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
           <button type="button" className="bukti" data-toggle="modal" data-target={`#id-card-modal-${data.data.id}`}>
            Kartu Anggota
            </button>
            <div class="modal" id={`id-card-modal-${data.data.id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Kartu Anggota</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div style={{'left' : '25px'}} class="modal-body">
                            <div id={`id-card-${data.data.id}`} class="container-id-card">
                                <div class="header-id-card">
                                    <img src="/assets/logo-white.png" alt="logo" class="logo-white-id" />
                                    <h4 class="title-id-card">Kartu Tanda Anggota HARPI Melati</h4>
                                </div>
                                <h4 class="number-id-card">ID               : 123456789101112</h4>
                                <h4 class="nama-id-card">Nama        : {data.data.nama}</h4>
                                <h4 class="nohp-id-card">No. HP      : {data.data.hp}</h4>
                                <div class="rectangle-id-card">
                                </div>
                                <h4 class="date-id-card">Bergabung pada 28 Desember 2020</h4>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" onClick={generateIdCard}>Kirim</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default IdCardModal;
