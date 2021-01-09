import React, {useState} from 'react'
import Axios from 'axios'
import '../styles/mainpageXL.css'

const Form = () => {
    const [NamaLengkap, setNama] = useState("");
    const [Email, setEmail] = useState("");
    const [NoHp, setNoHp] = useState("");
    const [TanggalLahir, setTanggal] = useState("1970-01-01");
    const [Domisili, setDomisili] = useState("Banten");
    const [ImgName, setImgName] = useState("");
    const [Img, setImg] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('Img', Img);
            formData.append('ImgName', ImgName);
            formData.append('Domisili', Domisili);
            formData.append('TanggalLahir', TanggalLahir);
            formData.append('NoHp', NoHp);
            formData.append('Email', Email);
            formData.append('NamaLengkap', NamaLengkap);
            formData.append('Verified', false);
            formData.append('IdCard', "not yet verified");

            console.log(formData);
            
            await Axios.post('http://localhost:8080/', formData, {
                headers: {
                    "Content-Type":"multipart/form-data"
                }
            }).then(window.location.href = "http://localhost:3000/register-successful");
        } catch (err) {
            console.error(err.message)
        }
    };

    const uploadImg = e => {
        setImg(e.target.files[0]);
        setImgName(e.target.files[0].name);
    }

    return (
        <div className="container-fluid">
            <div className="row min-vw-100 min-vh-100">
                <div className="col-xl-7" id="rest">
                    <div class="row">
                        <div class="col-3 col-xl-3" id="logo">
                            <img src="/assets/logo-transparent.png" class="img-fluid logo-main-page" alt="Logo HARPI MELATI" />
                        </div>
                        <div class="col-9 col-xl-9" id="himpunan">
                            <h3 className="text-huge">HARPI MELATI</h3>
                            <p className="text-huge">Himpunan Perias Pengantin Indonesia "MELATI"</p>
                        </div>
                    </div>
                </div>
                {/* Form Pendaftaran */}
                <div className="col-xl-5 d-flex justify-content-center align-items-center" id="form">
                    <form onSubmit={onSubmitForm} className="form">
                        <p id="title">Pendaftaran Anggota Baru</p>
                        <br />
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
                        <label htmlFor="buktitrf">Upload Bukti Transfer*</label><br />
                        <input type="file" accept="image/*" id="buktitrf" name="bukti" onChange={uploadImg}/>
                        <br /><br />
                        <input type="submit" value="Kirim" id="kirim"/>
                        <br /><br />
                        <p id="copyright">Copyright 2021 Himpunan Perias Pengantin Indonesia "MELATI"</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;
