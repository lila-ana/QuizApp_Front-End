import React from "react";
import { useDispatch } from "react-redux"; // Import useDispatch hook
import { useForm, SubmitHandler } from "react-hook-form";
import { FormData } from "../types";
import CustomButton from "../components/customButton";
import { createQuiz } from "../store";

const QuizPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(createQuiz(data));
  };

  return (
    <div className="flex flex-col m-5 items-center justify-center p-3">
      <form className="font-poppins" onSubmit={handleSubmit(onSubmit)}>
        <div className="p-3">
          <label className="font-semibold">Ttile: </label>
          <input
            type="text"
            {...register("title", { required: "Email is required" })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className="p-3">
          <label className="font-semibold">Body: </label>
          <input
            type="text"
            {...register("body", { required: "Password is required" })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <CustomButton
          btnType="submit"
          title="Submit"
          containerStyles="text-[13px] text-white bg-green-600 rounded-full"
        />
      </form>
    </div>
  );
};

export default QuizPage;
