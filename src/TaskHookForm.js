import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


export default function TaskHookForm({ kisiler, submitFn }) {

  // useForm içerisine başlangıç değerlerini böyle verebiliriz:
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      id: "", // TaskForm.js'te de bu şekilde verilmiş.
      title: "",
      description: "",
      people: [],
    },
    mode: "onChange"
  });

  // handleSubmit içerisindeki onSubmit / handleSubmit(mySubmit):

  function mySubmit(formData) {
    console.log("formData:", formData);
    toast.success("Task Eklendi! Hadi Göreve!!!")
    submitFn({
      ...formData,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset()
  }

  return (
    <div>

      <form className="taskForm" onSubmit={handleSubmit(mySubmit)}>
        <div className="form-line">
          <label className="input-label" htmlFor="title">
            Başlık
          </label>
          <input
            className="input-text"
            id="title"
            type="text"
            {...register("title", { required: "Task başlığı yazmalısınız", minLength: { value: 3, message: "Task başlığı en az 3 karakter olmalı" } })}
          />
          {errors.title && <p className="input-error">{errors.title.message}</p>}
        </div>

        <div className="form-line">
          <label className="input-label" htmlFor="description">
            Açıklama
          </label>
          <textarea
            className="input-textarea"
            rows="3"
            id="description"
            {...register("description", { required: "Task açıklaması yazmalısınız", minLength: { value: 10, message: "Task açıklaması en az 10 karakter olmalı" } })}
          ></textarea>
          {errors.description && <p className="input-error">{errors.description.message}</p>}
        </div>

        <div className="form-line">
          <label className="input-label">İnsanlar</label>
          <div>
            {kisiler.map((p) => (
              <label className="input-checkbox" key={p}>
                <input
                  type="checkbox"
                  value={p}
                  {...register("people", {
                    required: "Lütfen en az bir kişi seçin",
                    validate: (peopleList) => peopleList.length <= 3 || "En fazla 3 kişi seçebilirsiniz",
                  })}
                />
                {p}
              </label>
            ))}
          </div>
          {errors.people && <p className="input-error">{errors.people.message}</p>}
        </div>

        <div className="form-line">
          <button
            className="submit-button"
            type="submit"
            disabled={!isValid}
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>

  )
}



