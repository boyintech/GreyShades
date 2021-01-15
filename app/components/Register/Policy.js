// Privacy Policy
// Your privacy is important to us. It is MistriTools' policy to respect your privacy regarding any information we may collect from you across our website, http://mistritool.con, and other sites we own and operate.

// We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.

// We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.

// We don’t share any personally identifying information publicly or with third-parties, except when required to by law.

// Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.

// You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.

// Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.

// This policy is effective as of 27 September 2020.

// 1. Terms
// By accessing the website at http://mistritool.con, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.

// 2. Use License
// Permission is granted to temporarily download one copy of the materials (information or software) on MistriTools' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
// modify or copy the materials;
// use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
// attempt to decompile or reverse engineer any software contained on MistriTools' website;
// remove any copyright or other proprietary notations from the materials; or
// transfer the materials to another person or "mirror" the materials on any other server.
// This license shall automatically terminate if you violate any of these restrictions and may be terminated by MistriTools at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
// 3. Disclaimer
// The materials on MistriTools' website are provided on an 'as is' basis. MistriTools makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
// Further, MistriTools does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
// 4. Limitations
// In no event shall MistriTools or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MistriTools' website, even if MistriTools or a MistriTools authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.

// 5. Accuracy of materials
// The materials appearing on MistriTools' website could include technical, typographical, or photographic errors. MistriTools does not warrant that any of the materials on its website are accurate, complete or current. MistriTools may make changes to the materials contained on its website at any time without notice. However MistriTools does not make any commitment to update the materials.

// 6. Links
// MistriTools has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by MistriTools of the site. Use of any such linked website is at the user's own risk.

// 7. Modifications
// MistriTools may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.

// 8. Governing Law
// These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.

import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import {Header, Content, } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import * as fontStyle from '../../common/stylesheet/fontStyle.js';
import { ScrollView } from 'react-native-gesture-handler';


const {height, width} = Dimensions.get('window');


class Policy extends React.Component {

  constructor(props){
    super(props);
    console.log(this.props)
  }



  render(){
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
         <Header style={{backgroundColor: '#EB5757', justifyContent: 'space-between', paddingTop: 1.5*height/100,}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{flexDirection: 'row'}}>
                <AntDesign name='arrowleft' size={30} style={{color: 'white',}} />
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: 'white', fontSize: 22, marginTop: .5*height/100, marginLeft: 3*width/100}}>Privacy Policy</Text>
            </TouchableOpacity>
        </Header>
        <ScrollView>
        <Content style={{marginLeft: 3*width/100}}>
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, alignSelf: 'center', fontSize: 26, marginBottom: 3*height/100, marginTop: 1*height/100}}>Privacy Policy</Text>
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16}}>
            Your privacy is important to us. It is MistriTools' policy to respect your privacy regarding any information we may collect from you across our Application, and other Application we own and operate.

We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.

We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.

We don’t share any personally identifying information publicly or with third-parties, except when required to by law.

Our Application may link to external sites/applications that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.

You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.

Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
            </Text>

            <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, alignSelf: 'center', fontSize: 26, marginBottom: 3*height/100, marginTop: 1*height/100}}>Terms & Conditions</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 20, marginBottom: 1*height/100, marginTop: 1*height/100}}>1. Terms</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16}}>By accessing our Application, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.</Text>

                <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 20, marginBottom: 1*height/100, marginTop: 1*height/100}}>2. Use License</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16}}>
                Permission is granted to temporarily download one copy of the materials (information or software) on MistriTools' Application for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
modify or copy the materials;
use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
attempt to decompile or reverse engineer any software contained on MistriTools' application;
remove any copyright or other proprietary notations from the materials; or
transfer the materials to another person or "mirror" the materials on any other server.
This license shall automatically terminate if you violate any of these restrictions and may be terminated by MistriTools at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
                </Text>

                <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 20, marginBottom: 1*height/100, marginTop: 1*height/100}}>3. Disclaimer</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16}}>The materials on MistriTools' application are provided on an 'as is' basis. MistriTools makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
Further, MistriTools does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites/applications linked to this site.
</Text>

                <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 20, marginBottom: 1*height/100, marginTop: 1*height/100}}>4. Limitations</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16}}>
                In no event shall MistriTools or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MistriTools' website, even if MistriTools or a MistriTools authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                </Text>

                <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 20, marginBottom: 1*height/100, marginTop: 1*height/100}}>5. Accuracy of materials</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16}}>
                The materials appearing on MistriTools' application could include technical, typographical, or photographic errors. MistriTools does not warrant that any of the materials on its application are accurate, complete or current. MistriTools may make changes to the materials contained on its application at any time without notice. However MistriTools does not make any commitment to update the materials.
                </Text>

                <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 20, marginBottom: 1*height/100, marginTop: 1*height/100}}>6. Links</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16}}>
                MistriTools has not reviewed all of the sites/application linked to its website and is not responsible for the contents of any such linked site/application. The inclusion of any link does not imply endorsement by MistriTools of the site/application. Use of any such linked website/application is at the user's own risk.
                </Text>

                <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 20, marginBottom: 1*height/100, marginTop: 1*height/100}}>7. Modifications</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16}}>
                MistriTools may revise these terms of service for its website at any time without notice. By using this application you are agreeing to be bound by the then current version of these terms of service.
                </Text>

                <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 20, marginBottom: 1*height/100, marginTop: 1*height/100}}>8. Governing Law</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16}}>
                These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                </Text>

        </Content>
        </ScrollView>
      </View>
    );
  }
}

export default (connect)()(Policy);
