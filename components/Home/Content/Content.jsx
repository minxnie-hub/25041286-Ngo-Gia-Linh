import React from 'react';
import AnimateOnScreen from '../../AnimateOnScreen';
import { ContentSection, TextWrapper, Text } from './styles';

const Content = () => {
  return (
    <AnimateOnScreen>
      <ContentSection>
        <TextWrapper>
          <Text>
            Ngôn ngữ không chỉ nằm trong giáo trình.
            <br />
            với Gia Linh, đó còn là hành trình kết nối văn hoá Nga, công nghệ số
            và cách học chủ động trong từng dự án.
          </Text>
        </TextWrapper>
      </ContentSection>
    </AnimateOnScreen>
  );
};

export default Content;
