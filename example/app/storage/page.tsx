"use client";
import { useEffect } from "react";
import {
  useFile,
  useFileDelete,
  useFileDownload,
  useFileUpload,
} from "react-appwrite/storage";
export default function StoragePage() {
  const upload = useFileUpload();
  const { data } = useFile("test", "test");
  const deleteFile = useFileDelete();
  // const testPreview = useFilePreview('test', 'test')
  const download = useFileDownload();

  useEffect(() => {
    download.mutate({ bucketId: "test", fileId: "test" });
  }, []);

  console.log({ download });

  return (
    <div className="grid w-screen h-screen place-items-center">
      <div className="bg-transparent border-2 border-white/[.20] rounded px-[10vw] py-[100px]">
        <div className="flex gap-2 max-[720px]:flex-col lg:flex-row">
          <input
            type="file"
            className="grid place-content-center drop-shadow-lg hover:scale-[1.01] transition-all  "
            onChange={(event) => {
              const file = event.target?.files?.[0];
              if (file) {
                upload.mutate({
                  bucketId: "test",
                  fileId: "test",
                  file,
                });
              }
            }}
          />
          <div>
            <button
              type="button"
              className="error button"
              onClick={() => {
                const url = deleteFile.mutate({
                  bucketId: "test",
                  fileId: "test",
                });
              }}
            >
              Delete
            </button>
            <div className=" min-w-fit inline-block ">
              {upload.isLoading && <span>Loading</span>}
              {data && <p>{data.name}</p>}
              <a
                download={data?.name}
                className="success p-3 m-2 button hover:bg-transparent hover:text-success-100"
                href={download.data?.href}
              >
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
