import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineMail } from 'react-icons/ai';
import { BiInfoCircle } from 'react-icons/bi';
import { BiPhoneCall } from 'react-icons/bi';
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from 'yup'
import { createQuery } from "../features/contact/contactSlice";
import { useAppDispatch } from "../app/hooks";
const contactSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().nullable().email('Email address should be valid').required('Email address is required'),
  mobile: yup.string().default('').nullable().required('Mobile number is required'),
  comment: yup.string().default('').nullable().required('Comment is required'),
})
export default function Contact() {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
        name: '',
        email: '',
        mobile: '',
        comment: '',
    },
    validationSchema: contactSchema,
    onSubmit: values => {
        dispatch(createQuery(values))
    },
})
  return (
    <>
      <Meta title="Contact Us" />
      <BreadCrumb title="Contact Us" />
      <Container containerClass="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe title="contact" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.4587047611503!2d7.950969571397423!3d5.029104583780767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105d57f45bf90961%3A0xfd76f166d5f9911f!2s220%20Nwaniba%20Road%2C%20520101%2C%20Uyo%2C%20Akwa%20Ibom!5e0!3m2!1sen!2sng!4v1686127855165!5m2!1sen!2sng" width="600" height="450" className="border-0 w-100" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between">
              <div>
                <h3 className="contact-title">Contact</h3>
                <form action="" className="d-flex flex-column gap-15" onSubmit={formik.handleSubmit}>
                  <div>
                    <input type="text" className="form-control" placeholder="Name" value={formik.values.name} onChange={formik.handleChange('name')} onBlur={formik.handleBlur('name')} />
                  </div>
                  <div className="error">
                    {
                      formik.touched.name && formik.errors.name
                    }
                  </div>

                  <div>
                    <input type="email" className="form-control" placeholder="Email" value={formik.values.email} onChange={formik.handleChange('email')} onBlur={formik.handleBlur('email')} />
                  </div>
                  <div className="error">
                    {
                      formik.touched.email && formik.errors.email
                    }
                  </div>

                  <div>
                    <input type="tel" className="form-control" placeholder="Mobile Number" value={formik.values.mobile} onChange={formik.handleChange('mobile')} onBlur={formik.handleBlur('mobile')} />
                  </div>
                  <div className="error">
                    {
                      formik.touched.mobile && formik.errors.mobile
                    }
                  </div>

                  <div>
                    <textarea className="form-control" name="" id="" cols={30} rows={4} placeholder="Comment" value={formik.values.comment} onChange={formik.handleChange('comment')} onBlur={formik.handleBlur('comment')}></textarea>
                  </div>
                  <div className="error">
                    {
                      formik.touched.comment && formik.errors.comment
                    }
                  </div>
                  <div>
                    <button className="button border-0">Submit</button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className="contact-title">Get in Touch with Us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineHome className="fs-5" />
                      <address className="mb-0">220 Nwaniba Street, Uyo, Akwa Ibom State</address>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiPhoneCall className="fs-5" />
                      <a href="tel:+2349134909366">+2349134909366</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineMail className="fs-5" />
                      <a href="mailto:umichaeledet003@gmail.com">umichaeledet003@gmail.com</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiInfoCircle className="fs-5" />
                      <p className="mb-0">Monday - Friday 9 AM - 7PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
