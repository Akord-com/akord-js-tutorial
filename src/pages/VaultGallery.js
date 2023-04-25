import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Akord } from "@akord/akord-js";
import { useContext } from "react";
import { Context } from "../store";
import ReactMarkdown from "react-markdown";
import vaultgallery_md from "../md/vaultgallery.md.js";

const VaultGallery = (props) => {
  const params = useParams();
  const [state] = useContext(Context);
  const [imageUrls, setImagesUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadVault = async (vaultId) => {
      // Update the document title using the browser API

      if (state.current_user) {
        setIsLoading(true);
        const akord = await Akord.init(state.current_user.wallet);
        const stacks = await akord.stack.listAll(vaultId);

        for (let i in stacks) {
          const stack = stacks[i];
          const type = stack.versions.slice(-1)[0].type;

          try {
            if (stack.id && (type === "image/jpeg" || type === "image/png")) {
              const { data: file } = await akord.stack.getVersion(stack.id);
              const fileUrl = URL.createObjectURL(new Blob([file]));
              setImagesUrls((current) => [...current, fileUrl]);
            }
          } catch (error) {
            console.log("Error Downloading:", error);
          }
        }
      }
      setIsLoading(false);
    };
    loadVault(params.vaultId);
  }, [state, params]);

  return (
    <>
      <ReactMarkdown className="md">{vaultgallery_md}</ReactMarkdown>
      <p>
        {imageUrls.map((url, i) => (
          <img
            src={url}
            className=" m-1 border-no"
            key={i}
            style={{ maxHeight: "8rem" }}
            alt="vault thumbnail"
          />
        ))}
      </p>
      {isLoading && <div className="spinner-border  text-light"></div>}
    </>
  );
};

export default VaultGallery;
