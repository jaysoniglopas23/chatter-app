import React, {Component} from 'react';

import {Text} from 'react-native';

const utf8 = require('utf8');

class StringUtils extends Component {
  static convertUnicode(input) {
    try {
      return input.replace(/\\u([0-9a-fA-F]{4})/g, function (a, b) {
        var charcode = parseInt(b, 16);
        return String.fromCharCode(charcode);
      });
    } catch (ex) {
      return '';
    }
  }

  static convertEmoji(message) {
    var emojiRegexp =
      /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g;
    if (!message) return;
    try {
      var newMessage = message.match(emojiRegexp);
      for (var emoj in newMessage) {
        var emojmessage = newMessage[emoj];
        var index = message.indexOf(emojmessage);
        if (index === -1) continue;
        emojmessage =
          '\\u' +
          emojmessage.charCodeAt(0).toString(16) +
          '\\u' +
          emojmessage.charCodeAt(1).toString(16);
        message =
          message.substr(0, index) + emojmessage + message.substr(index + 2);
      }
      return message;
    } catch (err) {
      console.error('error in emojiToUnicode' + err.stack);
    }
  }

  static findHashtags1(string) {
    let arr = string.split(' ');

    var regexp = /#([^\s#]+)/g;

    var arrHashtags = [];

    for (var i = 0; i < arr.length; i++) {
      res = arr[i].match(regexp);

      if (res != null) {
        for (var j = 0; j < res.length; j++) {
          arrHashtags.push(res[j]);
        }
      }
    }

    return arrHashtags;
  }

  static findHashtags(string, self) {
    //console.log(string.split(/((?:^|\s)(?:#[a-z\d-]+))/gi));

    return string
      .split('\n')
      .filter(Boolean)
      .map(nl => {
        let nlAppended = nl + '\n';

        return nlAppended
          .split(' ')
          .filter(Boolean)
          .map(v => {
            if (v.startsWith('#')) {
              let i = v + ' ';

              return (
                <Text
                  onPress={() => self.pressHashtag(v)}
                  style={{color: '#004ed0'}}>
                  {i}
                </Text>
              );
            } else if (v.startsWith('https')) {
              let j = v + ' ';

              return (
                <Text
                  onPress={() => self.pressLink(v)}
                  style={{color: '#004ed0'}}>
                  {j}
                </Text>
              );
            } else if (v.startsWith('http')) {
              let k = v + ' ';

              return (
                <Text
                  onPress={() => self.pressLink(v)}
                  style={{color: '#004ed0'}}>
                  {k}
                </Text>
              );
            } else {
              let y = v + ' ';

              return <Text>{y}</Text>;
            }
          });
      });
  }

  static findURLs(string, self) {
    //console.log(string.split(/((?:^|\s)(?:#[a-z\d-]+))/gi));

    return string
      .split('\n')
      .filter(Boolean)
      .map(nl => {
        let nlAppended = nl + '\n';

        return nlAppended
          .split(' ')
          .filter(Boolean)
          .map(v => {
            if (v.startsWith('https')) {
              let i = v + ' ';

              return (
                <Text
                  onPress={() => self.pressURL(v)}
                  style={{color: '#004ed0'}}>
                  {i}
                </Text>
              );
            } else if (v.startsWith('http')) {
              let j = v + ' ';

              return (
                <Text
                  onPress={() => self.pressURL(v)}
                  style={{color: '#004ed0'}}>
                  {j}
                </Text>
              );
            } else {
              let y = v + ' ';

              return <Text>{y}</Text>;
            }
          });
      });
  }
}

export default StringUtils;
