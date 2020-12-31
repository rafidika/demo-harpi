import Axios from 'axios'
import React, { Fragment, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.min.css';
import Alert from './Alert'

export default function EditMember(data) {
    const [NamaLengkap, setNama] = useState(data.data.nama);
    const [Email, setEmail] = useState(data.data.email);
    const [NoHp, setNoHp] = useState(data.data.hp);
    const [TanggalLahir, setTanggal] = useState(data.data.tanggal.split("T")[0]);
    const [Domisili, setDomisili] = useState(data.data.domisili);
    const [alert, setAlert] = useState({show: false, msg: "", type: ""})

    const onSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            const editData = new FormData();
            editData.append('Id', data.data.id);
            editData.append('Domisili', Domisili);
            editData.append('TanggalLahir', TanggalLahir);
            editData.append('NoHp', NoHp);
            editData.append('Email', Email);
            editData.append('NamaLengkap', NamaLengkap);

            await Axios.put(`http://localhost:8080/admin/edit/${data.data.id}`, editData)
            .then(showAlertEdit(true, "Data berhasil diedit.","success"))
        } catch (err) {
            console.log(err.message);
        }
    };

    const deleteMember = async (id) => {
        try {
           await Axios.delete(`http://localhost:8080/admin/${id}`)
           .then(window.location.href = "/admin");
        } catch (err) {
            console.log(err.message);
        }
    }

    const showAlertEdit = (show = false, msg = "", type = "") => {
        setAlert({show, msg, type})
    }

    const refreshWindow = () => {
        window.location.href = "/admin";
    }

    return (
        <Fragment>
            <button 
                style={{'border': 'none', 'backgroundColor': 'transparent'}}
                data-toggle="modal" 
                data-target="#editMember">
                <FontAwesomeIcon icon={faEdit} />
            </button>
            <div class="modal" id="editMember">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Data Anggota</h4>
                            <button type="button" class="close" data-dismiss="modal" onClick={refreshWindow}>&times;</button>
                        </div>
                        <div class="modal-body">
                        {alert.show && <Alert msg={alert.msg} type={alert.type} removeAlert={showAlertEdit}/>}
                            <form onSubmit={onSubmitEdit}>
                                <label htmlFor="nama">Nama Lengkap*</label>
                                <br />
                                <input type="text" required name="NamaLengkap" id="nama" value={NamaLengkap} onChange={e => setNama(e.target.value)}/>
                                <br />
                                <label htmlFor="email">Email*</label>
                                <br />
                                <input type="email" required name="Email" id="email" value={Email} onChange={e => setEmail(e.target.value)}/>
                                <br />
                                <label htmlFor="email">Nomor HP*</label>
                                <br />
                                <input type="number" required name="NoHp" id="email" value={NoHp} onChange={e => setNoHp(e.target.value)}/>
                                <br />
                                <label htmlFor="tanggal">Tanggal lahir*</label>
                                <br />
                                <input type="date" name="TanggalLahir" id="tanggal" value={TanggalLahir} onChange={e => setTanggal(e.target.value)} required/>
                                <br />
                                <label htmlFor="domisili">Domisili*</label>
                                <br />
                                <select id="domisili" name="Domisili" required onChange={e => setDomisili(e.target.value)}>
                                    <option value="Banten">Banten</option>
                                    <option value="DKI Jakarta">DKI Jakarta</option>
                                    <option value="Jawa Barat">Jawa Barat</option>
                                    <option value="Jawa Tengah">Jawa Tengah</option>
                                    <option value="D.I. Yogyakarta">D.I. Yogyakarta</option>
                                    <option value="Jawa Timur">Jawa Timur</option>
                                    <option value="Aceh">Aceh</option>
                                    <option value="Sumatra Utara">Sumatra Utara</option>
                                    <option value="Sumatra Barat">Sumatra Barat</option>
                                    <option value="Riau">Riau</option>
                                    <option value="Kepulauan Riau">Kepulauan Riau</option>
                                    <option value="Jambi">Jambi</option>
                                    <option value="Bengkulu">Bengkulu</option>
                                    <option value="Sumatra Selatan">Sumatra Selatan</option>
                                    <option value="Kepulauan Bangka Belitung">Kepulauan Bangka Belitung</option>
                                    <option value="Lampung">Lampung</option>
                                    <option value="Bali">Bali</option>
                                    <option value="Nusa Tenggara Barat">Nusa Tenggara Barat</option>
                                    <option value="Nusa Tenggara Timur">Nusa Tenggara Timur</option>
                                    <option value="Kalimantan Barat">Kalimantan Barat</option>
                                    <option value="Kalimantan Selatan">Kalimantan Selatan</option>
                                    <option value="Kalimantan Tengah">Kalimantan Tengah</option>
                                    <option value="Kalimantan Timur">Kalimantan Timur</option>
                                    <option value="Kalimantan Utara">Kalimantan Utara</option>
                                    <option value="Gorontalo">Gorontalo</option>
                                    <option value="Sulawesi Utara">Sulawesi Utara</option>
                                    <option value="Sulawesi Barat">Sulawesi Barat</option>
                                    <option value="Sulawesi Tengah">Sulawesi Tengah</option>
                                    <option value="Sulawesi Tenggara">Sulawesi Tenggara</option>
                                    <option value="Sulawesi Selatan">Sulawesi Selatan</option>
                                    <option value="Maluku">Maluku</option>
                                    <option value="Maluku Utara">Maluku Utara</option>
                                    <option value="Papua">Papua</option>
                                    <option value="Papua Barat">Papua Barat</option>
                                </select>
                                <br /><br />
                                <input type="submit" value="Edit" id="kirim"/>
                                <br /><br />
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal"  onClick={() => deleteMember(data.data.id)}>Hapus Anggota</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
