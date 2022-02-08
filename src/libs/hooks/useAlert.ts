import { useToast, UseToastOptions } from "@chakra-ui/react";
/**
 * 実行すると画面にAlertを表示します。
 * @param {string} msg Alertに表示するメッセージ
 * @param {string} status Alertの種類(次のいずれか "info" | "warning" | "success" | "error")
 * @param {boolean} isAutoClose Alertを自動で閉じるかどうか(Default = true)
 */
export const useAlert = (
    msg: string,
    status: "info" | "warning" | "success" | "error" | undefined,
    isAutoClose: boolean = true
) => {
    const param: UseToastOptions = {
        title: msg,
        position: "top",
        status: status,
        isClosable: true,
        duration: isAutoClose ? 5000 : null,
    };
    return useToast(param);
};