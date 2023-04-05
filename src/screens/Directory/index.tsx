import * as React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {MyHeader} from '../../components/MyHeader';
import {ParticipantElement} from '../../components/ParticipantElement';
import {routes} from '../../constants';

export const Directory = () => {
  return (
    <SafeAreaView>
      <MyHeader title="Directory" />
      <ScrollView>
        <ParticipantElement
          round={false}
          url={routes.about}
          title="About IFAWPCA"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <ParticipantElement
          round={false}
          url={routes.memberList}
          title="IFAWPCA Members"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          params={{
            title: 'IFAWPCA Members',
            round: false,
            url: routes.companyProfile,
          }}
        />
        <ParticipantElement
          round={false}
          url={routes.officeBearers}
          params={{title: 'Office Bearers', round: true}}
          title="Office Bearers"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <ParticipantElement
          round={false}
          url={routes.boardMemberList}
          params={{title: 'Board Members', round: true}}
          title="Board Members"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
      </ScrollView>
    </SafeAreaView>
  );
};
