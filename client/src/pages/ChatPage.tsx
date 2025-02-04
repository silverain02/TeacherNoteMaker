import { Textarea } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Flex } from "@chakra-ui/react";

const inputAreaText = {
  label: "구문 분석기",
  helperText: "영어로만 이루어진 100단어 이내 지문만 입력가능",
  errorText: "영어로만 이루어진 100단어 이내 지문만 입력가능",
  placeholder: "분석할 영어지문을 입력해보세요",
};

const ChatPage = () => {
  return (
    <>
      <Flex direction="column" align="center" justify="center">
        <Field
          width="80%"
          label={inputAreaText.label}
          helperText={inputAreaText.helperText}
          errorText={inputAreaText.errorText}
        >
          <Textarea
            variant="outline"
            resize="vertical"
            placeholder={inputAreaText.placeholder}
          />
        </Field>
      </Flex>
    </>
  );
};

export default ChatPage;
