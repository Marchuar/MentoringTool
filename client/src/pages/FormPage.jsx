import { useEffect } from "react"
import { useState } from "react"
import { API_URL } from '../api'
import axios from "axios"
import { Card } from 'antd';
import classes from './Form.module.css'

const Form = (formData) => {
    const [formValue, setFormValue] = useState(false)

    const getData = async (formID) => {
        await axios.post(`${API_URL}/form-value`, { formID })
            .then((response) => {
                setFormValue(response.data.formValue)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        if (!formData.formData.data) {
            let formID = localStorage.getItem('formID')
            console.log(formID)
            if (formID) {
                getData(formID)
            }
        } else {
            setFormValue(formData.formData.data.formValue)
        }
    }, [formData])

    //formValue = all information(title, datatype, note, value)

    if (!formValue) {
        console.log('formValue is empty')
    } else {
        return (
            <div className={classes.background}>
                {formValue.map((formItem) => (
                    <div key={formItem.title} className={classes.formItemBox}>
                        <Card
                            title={formItem.title}
                            bordered={false}
                            style={{
                                width: 400,
                            }}
                        >
                            <p>Answer: {formItem.value}</p>
                            <p>Datatype: {formItem.datatype}</p>
                            <p>Note: {formItem.note}</p>
                        </Card>
                    </div>
                ))}
            </div>
        )
    }
}

export default Form;
