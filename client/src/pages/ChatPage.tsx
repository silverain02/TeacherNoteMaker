import {
  Textarea,
  Flex,
  Button,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { INPUT_CONDITION_DATA, INPUT_TEXT_DATA } from "@/static/chatPageData";
import useAnalyzeSyntax from "@/apis/post/useAnalyzeSyntax";

interface FormValues {
  inputSentences: string;
}

const ChatPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const analyzeSyntax = useAnalyzeSyntax();

  const onSubmit = handleSubmit((data) => {
    analyzeSyntax.mutate(data.inputSentences);
  });

  return (
    <>
      <Flex direction="column" marginTop="2rem">
        <form onSubmit={onSubmit} style={{ width: "100%" }}>
          <Flex direction="row" align="center" justify="center" gap="1rem">
            <Field
              width="80%"
              label={INPUT_TEXT_DATA.LABEL}
              invalid={!!errors.inputSentences}
              errorText={errors.inputSentences?.message}
            >
              <Textarea
                variant="outline"
                resize="vertical"
                placeholder={INPUT_TEXT_DATA.PLACEHOLDER}
                {...register("inputSentences", {
                  required: INPUT_TEXT_DATA.ERROR_TEXT.EMPTY,
                  maxLength: {
                    value: INPUT_CONDITION_DATA.MAX_LENGTH,
                    message: INPUT_TEXT_DATA.ERROR_TEXT.MAX_LENGTH,
                  },
                  minLength: {
                    value: INPUT_CONDITION_DATA.MIN_LENGTH,
                    message: INPUT_TEXT_DATA.ERROR_TEXT.MIN_LENGTH,
                  },
                  pattern: {
                    value: INPUT_CONDITION_DATA.REGEX,
                    message: INPUT_TEXT_DATA.ERROR_TEXT.ENGLISH_ONLY,
                  },
                })}
              />
            </Field>
            <Button
              type="submit"
              alignSelf="flex-start"
              marginTop="1.7rem"
              disabled={analyzeSyntax.isPending}
            >
              Submit
            </Button>
          </Flex>
        </form>

        <Flex
          direction="column"
          marginTop="2rem"
          width="80vw"
          justify="center"
          align="center"
        >
          {analyzeSyntax.isPending ? (
            <HStack>
              <Spinner />
              <Text>Loading...</Text>
            </HStack>
          ) : analyzeSyntax.isError ? (
            <div>Error...{analyzeSyntax.error.message}</div>
          ) : analyzeSyntax.isSuccess ? (
            <div>{JSON.stringify(analyzeSyntax.data)}</div>
          ) : null}
        </Flex>
      </Flex>
    </>
  );
};

export default ChatPage;
