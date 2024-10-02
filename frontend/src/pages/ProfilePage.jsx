import React, { useState } from 'react'
import Header from '../components/layout/Header'
import styles from '../styles/style'
import ProfileSidebar from '../components/profile/ProfileSidebar'
import ProfileContent  from '../components/profile/ProfileContent'
import Footer from '../components/layout/Footer'
// import { useSelector } from 'react-redux'

const ProfilePage = () => {
    const [active, setActive] = useState(1)


  return (
    <div>
        <Header />
        <div className={`${styles.section } flex bg-[#f5f5f5] py-10`}>
            <div className="w-[50px] md:w-[335px] md:mt-0 sticky mt-[18%]">
                <ProfileSidebar active={active} setActive={setActive } />
            </div>
            <ProfileContent active={active} />
        </div>
        <Footer />
    </div>
  )
}

export default ProfilePage

