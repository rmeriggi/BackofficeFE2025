// import { useNavigate } from "react-router-dom";
import React  from "react";
import ButtonIcon from "./ButtonIcon";
// import { useDashboardFunctions } from "../../../../../contexts/dashboard/authFunctions";
// import { useDashboardContext } from "../../../../../hooks/useDashboardContext";
// import { useSuplierStore } from "../../../../../store";


const ButtonsContainerTable = ({
  id,
  className,
  showView,
  transferIcon,
  trashIcon,
  suplier,
  isSuplierList,
  handleDeleteAccount,
}) => {
//   const { openModal } = useDashboardFunctions();
//   const { setIdDeleteSuplier } = useDashboardContext();
//   const navigate = useNavigate();
//   const { setSelectedSuplier } = useSuplierStore();
  function NavigateToDetails() {
    console.log('press')
    // setSelectedSuplier(suplier);
    // navigate(`/pagos/suppliers/${id}`);
  }

  return (
    <div className={`${className} d-flex gap-4"`}>
      {showView && (
        <ButtonIcon
          functionButton={NavigateToDetails}
          width="30px"
          height="30px"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.3146 9.10429C16.808 8.22554 14.0213 3.81596 9.28712 3.95846C4.9092 4.06929 2.37587 7.91679 1.68712 9.10429C1.61763 9.22464 1.58105 9.36116 1.58105 9.50012C1.58105 9.63909 1.61763 9.77561 1.68712 9.89596C2.18587 10.7589 4.85379 15.0418 9.5167 15.0418H9.71462C14.0925 14.931 16.6338 11.0835 17.3146 9.89596C17.3841 9.77561 17.4207 9.63909 17.4207 9.50012C17.4207 9.36116 17.3841 9.22464 17.3146 9.10429ZM9.67504 13.4585C6.26295 13.5376 4.03837 10.6164 3.3417 9.50012C4.13337 8.22554 6.19962 5.62096 9.36628 5.54179C12.7625 5.45471 14.995 8.38387 15.6996 9.50012C14.8842 10.7747 12.8417 13.3793 9.67504 13.4585Z"
                fill="#103F5A"
              />
              <path
                d="M9.5013 6.72852C8.95328 6.72852 8.41757 6.89102 7.96191 7.19549C7.50625 7.49995 7.1511 7.93269 6.94139 8.439C6.73167 8.9453 6.6768 9.50242 6.78371 10.0399C6.89062 10.5774 7.15452 11.0711 7.54203 11.4586C7.92954 11.8461 8.42325 12.11 8.96074 12.2169C9.49823 12.3239 10.0554 12.269 10.5617 12.0593C11.068 11.8495 11.5007 11.4944 11.8052 11.0387C12.1096 10.5831 12.2721 10.0474 12.2721 9.49935C12.2721 8.76448 11.9802 8.05971 11.4606 7.54007C10.9409 7.02044 10.2362 6.72852 9.5013 6.72852ZM9.5013 10.6868C9.26644 10.6868 9.03685 10.6172 8.84156 10.4867C8.64628 10.3562 8.49408 10.1708 8.4042 9.95379C8.31432 9.7368 8.2908 9.49803 8.33662 9.26768C8.38244 9.03733 8.49554 8.82573 8.66161 8.65966C8.82769 8.49358 9.03928 8.38049 9.26963 8.33467C9.49999 8.28885 9.73875 8.31236 9.95574 8.40224C10.1727 8.49212 10.3582 8.64433 10.4887 8.83961C10.6192 9.03489 10.6888 9.26448 10.6888 9.49935C10.6888 9.81429 10.5637 10.1163 10.341 10.339C10.1183 10.5617 9.81625 10.6868 9.5013 10.6868Z"
                fill="#103F5A"
              />
            </svg>
          }
        />
      )}
      {trashIcon && (
        <ButtonIcon
          functionButton={NavigateToDetails}
          width="30px"
          height="30px"
          icon={
            <svg
              width="15"
              height="15"
              viewBox="0 0 21 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.25 22.75C3.5625 22.75 2.97396 22.5052 2.48438 22.0156C1.99479 21.526 1.75 20.9375 1.75 20.25V4H0.5V1.5H6.75V0.25H14.25V1.5H20.5V4H19.25V20.25C19.25 20.9375 19.0052 21.526 18.5156 22.0156C18.026 22.5052 17.4375 22.75 16.75 22.75H4.25ZM16.75 4H4.25V20.25H16.75V4ZM6.75 17.75H9.25V6.5H6.75V17.75ZM11.75 17.75H14.25V6.5H11.75V17.75Z"
                fill="#103F5A"
              />
            </svg>
          }
        />
      )}
    </div>
  );
};

export default ButtonsContainerTable;