import moment from 'moment';
import * as React from 'react';
import {ScrollView, useWindowDimensions, View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import {styles} from './style';

export const NewsDetails = () => {
  return (
    <ScrollView>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        }}
        style={[styles.image, {width: useWindowDimensions().width - 20}]}
      />
      <View style={styles.card}>
        <Text style={styles.title}>
          This is the title of the news details page
        </Text>
        <Text style={styles.date}>
          {moment(new Date()).format('MMMM DD, YYYY')}
        </Text>
        <Text style={styles.subText}>
          In literary theory, a text is any object that can be "read", whether
          this object is a work of literature, a street sign, an arrangement of
          buildings on a city block, or styles of clothing. It is a coherent set
          of signs that transmits some kind of informative message.[1] This set
          of signs is considered in terms of the informative message's content,
          rather than in terms of its physical form or the medium in which it is
          represented. Within the field of literary criticism, "text" also
          refers to the original information content of a particular piece of
          writing; that is, the "text" of a work is that primal symbolic
          arrangement of letters as originally composed, apart from later
          alterations, deterioration, commentary, translations, paratext, etc.
          Therefore, when literary criticism is concerned with the determination
          of a "text", it is concerned with the distinguishing of the original
          information content from whatever has been added to or subtracted from
          that content as it appears in a given textual document (that is, a
          physical representation of text). Since the history of writing
          predates the concept of the "text", most texts were not written with
          this concept in mind. Most written works fall within a narrow range of
          the types described by text theory. The concept of "text" becomes
          relevant if and when a "coherent written message is completed and
          needs to be referred to independently of the circumstances in which it
          was created.
        </Text>
      </View>
    </ScrollView>
  );
};
