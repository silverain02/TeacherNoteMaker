import { Textarea, Flex, Button } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";

interface FormValues {
  inputText: string;
}

const inputAreaCondition = {
  maxLength: 1000,
  minLength: 3,
  textRegex: /^[A-Za-z0-9\s.,'’“”";:!?_-]+$/, // 영어, 숫자, 특수문자 포함
};

const inputAreaText = {
  label: "구문 분석기",
  errorText: {
    empty: "지문을 입력해주세요",
    maxLength: `${inputAreaCondition.maxLength}자 이내로 입력해주세요`,
    minLength: `${inputAreaCondition.minLength}자 이상 입력해주세요`,
    englishOnly: "영어, 숫자, 특수문자만 입력해주세요",
  },
  placeholder: "분석할 영어지문을 입력해보세요",
};

const ChatPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <>
      <Flex direction="column">
        <form onSubmit={onSubmit} style={{ width: "100%" }}>
          <Flex direction="row" align="center" justify="center" gap={2}>
            <Field
              width="80%"
              label={inputAreaText.label}
              invalid={!!errors.inputText}
              errorText={errors.inputText?.message}
            >
              <Textarea
                variant="outline"
                resize="vertical"
                placeholder={inputAreaText.placeholder}
                {...register("inputText", {
                  required: inputAreaText.errorText.empty,
                  maxLength: {
                    value: inputAreaCondition.maxLength,
                    message: inputAreaText.errorText.maxLength,
                  },
                  minLength: {
                    value: inputAreaCondition.minLength,
                    message: inputAreaText.errorText.minLength,
                  },
                  pattern: {
                    value: inputAreaCondition.textRegex,
                    message: inputAreaText.errorText.englishOnly,
                  },
                })}
              />
            </Field>
            <Button type="submit" alignSelf="center">
              Submit
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default ChatPage;
